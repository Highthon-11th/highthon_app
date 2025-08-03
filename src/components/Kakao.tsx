import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

const Kakao = () => {
  return (
    <Svg width={19} height={18} viewBox="0 0 19 18" fill="none">
      <G clipPath="url(#clip0_692_3333)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5.6C4.53.6.5 3.713.5 7.552c0 2.388 1.558 4.493 3.932 5.745l-.999 3.648c-.088.322.28.579.563.392l4.377-2.889c.37.036.745.057 1.127.057 4.97 0 9-3.113 9-6.953C18.5 3.713 14.47.6 9.5.6z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_692_3333">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H17.9999V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Kakao;
