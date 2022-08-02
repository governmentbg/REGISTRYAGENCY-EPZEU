import * as React from 'react'
import {createUltimatePagination, ITEM_TYPES} from 'react-ultimate-pagination';

const WrapperComponent = ({children}) => (
  <ul className="pagination pagination--page">{children}</ul>
);

const withPreventDefault = (fn) => (event) => {
  event.preventDefault();
  fn();
};

const Page = ({value, isActive, onClick}) => (
  <li className={isActive ? 'page-item active' : 'page-item'}>
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>{value}</a>
  </li>
);

const Ellipsis = ({onClick}) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>...</a>
  </li>
);

const FirstPageLink = ({onClick}) => (
  <li className="page-item first">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&laquo;</a>
  </li>
);

const PreviousPageLink = ({onClick}) => (
  <li className="page-item prev">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&lsaquo;</a>
  </li>
);

const NextPageLink = ({onClick}) => (
  <li className="page-item next">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&rsaquo;</a>
  </li>
);

const LastPageLink = ({onClick}) => (
  <li className="page-item last">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&raquo;</a>
  </li>
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

export const Pagination = createUltimatePagination({itemTypeToComponent, WrapperComponent});
