// 即時実行関数でデータ取得
(async () => {
    try {
        const response = await fetch('https://ramen-api.dev/shops'); // データを取得
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // JSON形式に変換
        console.log(data); // データをコンソールに表示
    } catch (error) {
        console.error('Fetch error:', error); // エラーハンドリング
    }
})();
