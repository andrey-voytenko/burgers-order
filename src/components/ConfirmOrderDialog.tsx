import React, { useEffect, useRef, useState } from 'react';
import { useOrderStore } from '@/store/order';
import ProductCounter from '@/components/ProductCounter';

enum CardEnum{
  Regular = 'regular',
  Gold = 'gold',
  Platinum = 'platinum',
}

export default function ConfirmOrderDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { order, name, setName } = useOrderStore();
  const [currentCard, setCurrentCard] = useState<CardEnum>(CardEnum.Regular)

  useEffect(() => {
    if (order.size === 0) {
      onClose();
    }
  }, [order, onClose]);

  function handleConfirm() {
    let message = `Замовлення від: ${name} \n\n`;
    order.forEach((count, product) => {
      message += `${product.name} ${product.count ?? ''} : ${count} шт. \n`;
    });
    message += '\n До сплати: ' + sum + ' грн';

    fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message }),
    })
      .then((res) => res.json())
      .then(() => {
        onClose();
        alert('Готово, все ок!');
      })
      .catch((err) => console.error('Помилка:', err));
  }

  const dialogRef = useRef<HTMLDialogElement>(null);

  if (isOpen) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }

  let sum = 0;
  
  return (
    <dialog ref={dialogRef} className="p-6">
      <div className='flex flex-row gap-4 p-3' >
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-90 active:shadow-lg active:shadow-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                onClick={() => setCurrentCard(CardEnum.Regular)}>Без карти</button>
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold text-lg rounded-xl shadow-md hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-90 active:shadow-lg active:shadow-yellow-400/50 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                onClick={() => setCurrentCard(CardEnum.Gold)}>Золота</button>
        <button className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 font-semibold text-lg rounded-xl shadow-md hover:from-gray-300 hover:to-gray-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-90 active:shadow-lg active:shadow-gray-400/50 focus:outline-none focus:ring-4 focus:ring-gray-400"
                onClick={() => setCurrentCard(CardEnum.Platinum)}>Платинова</button>
      </div>
      <input
        className="bg-transparent border-b border-b-gray-400 focus:outline-none w-full mb-3"
        type="text"
        placeholder="Імʼя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {Array.from(order).map(([product, count]) => {
        sum += (product?.prices[currentCard] ?? 0) * count;
        return (
          product && (
            <div
              className="grid grid-cols-[300px_minmax(50px,100px)_50px]"
              key={product.id}
            >
              <p className="text-left inline">
                {product.name}{' '}
                <span className="text-xs">{product.count ?? ''}</span>
              </p>
              <p>{product?.prices[currentCard]}</p>
              <ProductCounter product={product} />
            </div>
          )
        );
      })}
      <div className="flex flex-row justify-between gap-4 mt-6">
        <p>До сплати:</p>
        <p>{sum} грн</p>
      </div>
      <div className="flex flex-row justify-between gap-4 mt-6">
        <button
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold text-lg rounded-xl shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-90 active:shadow-lg active:shadow-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-400"
          onClick={() => onClose()}
        >
          Скасувати
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold text-lg rounded-xl shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-90 active:shadow-lg active:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-400"
          onClick={handleConfirm}
          disabled={!name}
        >
          Підтвердити
        </button>
      </div>
    </dialog>
  );
}
