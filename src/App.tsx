import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  const originalArr = goodsFromServer;

  // Calculate the display goods based on current sort type and reverse state
  const getDisplayGoods = () => {
    const result = [...originalArr];

    if (sortType === 1) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 2) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const goods = getDisplayGoods();

  const handleSortAlph = () => {
    setSortType(1);
  };

  const handleSortLength = () => {
    setSortType(2);
  };

  const handleSortReset = () => {
    setSortType(0);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === 1 ? 'button is-info' : 'button is-info is-light'
          }
          onClick={handleSortAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 2 ? 'button is-success' : 'button is-success is-light'
          }
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortType !== 0 || isReversed === true ? (
          <button
            type="button"
            className={'button is-danger is-light'}
            onClick={handleSortReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
