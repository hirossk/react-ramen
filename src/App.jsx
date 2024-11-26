import { useState, useEffect } from 'react';
import { Card } from './components/Card'; // Cardコンポーネントをインポート
import { Modal } from './components/Modal'; // Modalコンポーネントをインポート
import { AutoSuggestForm } from './components/AutoSaggestForm';

export const App = () => {
    // 状態をブラウザを閉じても保存するようにする。
    // ローカルストレージに保存する
    const [shops, setShops] = useState(() => {
        const savedShops = localStorage.getItem('shops');
        return savedShops ? JSON.parse(savedShops) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(() => {
        const savedModalState = localStorage.getItem('isModalOpen');
        return savedModalState ? JSON.parse(savedModalState) : false;
    });
    const [selectedShop, setSelectedShop] = useState(() => {
        const savedSelectedShop = localStorage.getItem('selectedShop');
        return savedSelectedShop ? JSON.parse(savedSelectedShop) : null;
    });
    const [inputValue, setInputValue] = useState(() => {
        const savedInputValue = localStorage.getItem('inputValue');
        return savedInputValue ? JSON.parse(savedInputValue) : '';
    });

    // ローカルストレージにデータを保存する
    useEffect(() => {
        localStorage.setItem('shops', JSON.stringify(shops));
    }, [shops]);

    // ローカルストレージにモーダルの状態を保存する
    useEffect(() => {
        localStorage.setItem('isModalOpen', JSON.stringify(isModalOpen));
    }, [isModalOpen]);

    // ローカルストレージに選択されたショップ情報を保存する
    useEffect(() => {
        localStorage.setItem('selectedShop', JSON.stringify(selectedShop));
    }, [selectedShop]);


    // ローカルストレージに入力値を保存する
    useEffect(() => {
        localStorage.setItem('inputValue', JSON.stringify(inputValue));
    }, [inputValue]);

    // データを取得する非同期関数
    const fetchShops = async (qs = '?page=1&perPage=100') => {
        try {
            const response = await fetch('https://ramen-api.dev/shops' + qs);
            if (!response.ok) throw new Error('Network response was not ok'); // エラーチェック
            const data = await response.json(); // JSON形式に変換
            setShops(data.shops); // 取得したデータをセット
        } catch (error) {
            console.error('Error fetching data:', error); // エラーハンドリング
        }
    };

    // データを取得する非同期関数 店舗一つだけ
    const fetchShopOne = async (qs = '') => {
        try {
            const response = await fetch('https://ramen-api.dev/shops/' + qs);
            if (!response.ok) throw new Error('Network response was not ok'); // エラーチェック
            const data = await response.json(); // JSON形式に変換
            setShops([data.shop]); // 取得したデータをセット
        } catch (error) {
            console.error('Error fetching data:', error); // エラーハンドリング
            setShops([]);
        }
    };

    useEffect(() => {
        if (shops.length === 0) {
            fetchShops(); // 初回レンダリング時にデータ取得関数を実行
        }
    }, [shops.length]);

    // カードクリックでモーダルを開く関数
    const popupShop = (shop) => {
        setSelectedShop(shop); // クリックしたショップ情報をセット
        setIsModalOpen(true);  // モーダルを開く
    };

    // モーダルを閉じる関数
    const popdownShop = () => {
        setSelectedShop(null); // 選択ショップ情報をリセット
        setIsModalOpen(false); // モーダルを閉じる
    };

    // Enterキーが押された際に入力値を取得する関数
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { // Enterキーが押されたかどうかをチェック
            console.log("入力された値:", inputValue);
            fetchShopOne(inputValue);
            // setSearchHistory([...searchHistory, inputValue]); // 検索履歴を更新
            setInputValue(''); // 入力欄をクリア
        }
    };

    return (
        <div>
            <AutoSuggestForm setInputValue={setInputValue} onKeyDown={handleKeyDown} inputValue={inputValue}/>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {/* 各ショップ情報をCardコンポーネントとして表示 */}
                {shops.map((shop, i) => (
                    <Card key={i} id={shop.id} shop={shop} onPopup={popupShop} />
                ))}
            </div>
            {/* モーダルが開いているときにModalコンポーネントを表示 */}
            {isModalOpen && selectedShop && (
                <Modal shop={selectedShop} onPopdown={popdownShop} />
            )}
            {/* 検索履歴を表示 */}
           
        </div>
    );
};
