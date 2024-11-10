import { useState, useEffect } from 'react';
import { Card } from './components/Card'; // Cardコンポーネントをインポート
import { Modal } from './components/Modal'; // Modalコンポーネントをインポート

export const App = () => {
    const [shops, setShops] = useState([]); // 初期値は空の配列
    const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態
    const [selectedShop, setSelectedShop] = useState(null); // 選択されたショップ情報

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
        fetchShops(); // 初回レンダリング時にデータ取得関数を実行
    }, []);

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
    // 入力値を管理するためのstate
    const [inputValue, setInputValue] = useState('');

    // Enterキーが押された際に入力値を取得する関数
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { // Enterキーが押されたかどうかをチェック
            console.log("入力された値:", inputValue);
            fetchShopOne(inputValue)
            setInputValue(''); // 入力欄をクリア
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue} // 入力値のバインド
                onChange={(e) => setInputValue(e.target.value)} // 入力値の更新
                onKeyDown={handleKeyDown} // Enterキーの押下を検知
                placeholder="お店の名前をローマ字で入力してください（yoshimuraya）"
                size="50"
            />
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
        </div>
    );

};
