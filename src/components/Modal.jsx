import React from 'react';

export const Modal = ({ shop, onPopdown }) => {
    // 背景スタイル
    const overlayStyle = {
        position: 'fixed',
        // 画面全体を覆い隠す
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        // 表示領域以外を半透明にする
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // モーダルのコンテンツスタイル
    const modalContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    // 画像のスタイル
    const imageStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '20px',
    };

    // ボタンのスタイル
    const buttonStyle = {
        marginTop: '10px',
    };

    return (
        <div style={overlayStyle}>
            <div style={modalContentStyle}>
                <h2>{shop.name}</h2>
                {shop.photos[0]?.url && (
                    <img
                        src={shop.photos[0].url}
                        alt={shop.name}
                        style={imageStyle}
                    />
                )}
                <button onClick={onPopdown} style={buttonStyle}>Close</button>
            </div>
        </div>
    );
};
