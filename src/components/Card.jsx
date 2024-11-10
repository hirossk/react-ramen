// Cardコンポーネント
// propsとしてid, shop情報, onPopup関数を受け取る
export const Card = ({ shop, onPopup }) => {
    // カードのスタイル設定（枠線、丸角、幅、高さ、中央寄せ、余白、カーソルをポインターに設定）
    const cardStyle = {
        border: "1px solid #ccc", // 枠線を薄いグレーに設定
        borderRadius: "8px", // 丸みを帯びた角に設定
        width: "150px", // カードの幅を150pxに設定
        padding: "16px", // カード内の余白を16pxに設定
        textAlign: "center", // テキストを中央揃えに設定
        margin: "8px", // カード間の余白を8pxに設定
        cursor: "pointer", // マウスオーバー時にポインター（クリック可能）を表示
    };

    return (
        // カード全体がクリック可能で、クリック時にonPopup関数にshop情報を渡して実行
        <div style={cardStyle} onClick={() => onPopup(shop)}>
            {/* カードタイトルを表示 */}
            <h3>{shop.name}</h3> {/* shop.nameをタイトルとして表示 */}
        </div>
    );
};
