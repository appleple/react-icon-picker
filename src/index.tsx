import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const IconListWrap = styled.div`
  position: fixed;
  top: 10px;
  left: 0;
  max-width: 240px;
  z-index: 9999;
  &:before,
  &:after {
    bottom: calc(100% - 1px);
    left: 20px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(204, 204, 204, 0);
    border-bottom-color: #ccc;
    border-width: 11px;
    margin-left: -11px;
  }
`;

const IconListInner = styled.div`
  border: 1px solid #CCC;
  overflow-y: scroll;
  max-height: 200px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const IconList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;
  background: #FFF;
  white-space: normal;
  li {
    margin: 0;
    display: inline-block;
  }
`;

const IconItem = styled.li`
  padding: 8px;
  color: #333;
  font-size: 18px;
  border: 1px solid #FFF;
  border-radius: 4px;
  transition: background-color linear .15s;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    background: #BAE2F3;
  }
`

const BtnGroup = styled.div`
  border-collapse: separate;
  display: inline-table;
  padding: 7px 10px;
  padding-left: 0;
`;

const Btn = styled.button`
  background-color: #FFF;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  line-height: 1;
  vertical-align: middle;
  border-left: none;
  border: 1px solid #999;
  font-size: 12px;
  padding: 3px 5px;
  border-radius: 3px;
  display: table-cell;
  height: 28px;
  margin: 0;
  cursor: pointer;
  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

interface IconPickerProps {
  icons: string[],
  defaultValue?: string,
  onChange(icon: string): void
}

export default (props: IconPickerProps) => {
  let button: HTMLButtonElement;
  let listener: EventListener;
  const icons = props.icons || [];

  const [state, setState] = React.useState({
    icon: props.defaultValue ? props.defaultValue : '',
    isOpen: false,
    top: 0,
    left: 0
  });
  const { icon, isOpen, top, left } = state;

  React.useEffect(() => {
    listener = (e) => {
      if (e.target !== button && (!button.children || e.target !== button.children[0])) {
        setState({
          ...state,
          isOpen: false
        })
      }
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  });

  const selectIcon = (icon: string) => {
    setState({ ...state, icon });
    props.onChange(icon);
  }

  const openIconList = () => {
    const clientRect = button.getBoundingClientRect();
    setState({
      ...state,
      isOpen: !isOpen,
      top: clientRect.top,
      left: clientRect.left
    });
  }
  
  return (<>
    <BtnGroup style={{ padding: '0' }}>
      <Btn type="button" style={{ width: '50px' }}><span className={icon}></span></Btn>
      <Btn type="button" onClick={openIconList} ref={(btn) => {
        button = btn;
      }}>
        <FontAwesomeIcon icon={faArrowDown} />
      </Btn>
    </BtnGroup>
    <div style={{ position: 'relative' }}>
      {isOpen && <IconListWrap style={{ top: `${top + 45}px`, left: `${left}px` }}>
        <IconListInner>
          <IconList>
            {icons.map((icon, index) => {
              return (<IconItem key={index} onClick={() => {
                selectIcon(icon);
              }}><span className={icon}></span></IconItem>);
            })}
          </IconList>
        </IconListInner>
      </IconListWrap>}
    </div>
  </>);
}
