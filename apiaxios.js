// npm install axios
// moduleのインポートが必要になります。
const axios = require('axios');

// 即時実行関数でデータ取得
(async () => {
    try {
        const response = await axios.get('https://ramen-api.dev/shops'); // データを取得
        console.log(response.data); // データをコンソールに表示
    } catch (error) {
        console.error('Error fetching data:', error); // エラーハンドリング
    }
})();