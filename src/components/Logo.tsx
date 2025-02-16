import React from 'react';
import { Box, useTheme } from '@mui/material';

export function Logo() {
  const theme = useTheme();

  return (
    <Box sx={{ color: 'text.primary' }}>
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        x="0px" 
        y="0px" 
        viewBox="0 0 1047.9 531" 
        style={{ height: 40 }}
      >
        <title>Olark Logo</title>
        <g>
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M153.6,340.5c-23.7,2-45.9-1.6-66.7-11c-20.8-9.6-37.9-23.7-51.2-42.2c-13.1-18.9-20.8-40.7-22.9-65.6s1.8-47.6,11.6-68.2c10.1-20.8,24.5-37.6,43.4-50.2s40.3-20.1,63.9-22.1c23.9-2,46.1,1.6,66.7,11c20.8,9.3,37.7,23.4,50.9,42.3c13.1,18.7,20.8,40.4,22.9,65.3s-1.8,47.7-11.6,68.5c-9.8,20.6-24.1,37.4-43.1,50.2C198.6,331.1,177.3,338.5,153.6,340.5z M148.1,275.2c17.9-1.5,31.6-8.6,40.9-21.1c9.6-12.7,13.4-28.7,11.8-48.4c-1.7-20.1-8.3-35.4-19.7-46c-11.3-10.9-25.9-15.6-43.8-14.1c-18.1,1.5-31.9,8.6-41.2,21.1C86.8,179,83,195.3,84.7,215.3c1.7,19.8,8.2,35.2,19.4,46C115.2,272.2,130,276.7,148.1,275.2z M360,50.8l19.8,265.7l-70.4,5.2L289.6,56L360,50.8z M399.2,212.2c-1.5-20.8,0.9-39.3,7.2-55.4c6.5-16.1,15.9-28.8,28.3-38.2c12.6-9.3,26.8-14.6,42.9-15.8c13.9-1,26,0.9,36.5,5.7c10.5,4.8,18.8,11.7,25,20.5l-2-28l70.4-5.1l14.7,201.5l-70.4,5.1l-2-28c-4.8,9.8-12.1,17.7-22.1,24c-9.7,6.2-21.3,9.9-34.9,10.9c-16.1,1.2-30.9-2-44.7-9.4c-13.6-7.4-24.7-18.7-33.5-33.7C405.8,251.1,400.7,233.1,399.2,212.2z M544.4,204.4c0-13-3.6-23.2-10.8-30.6c-7-7.4-15.6-11.2-25.9-11.2c-10.6,0-19.3,3.7-26.3,11.2c-7,7.2-10.4,17.4-10.4,30.6c0,13,3.5,23.3,10.4,31c7,7.4,15.7,11.2,26.3,11.2c10.3,0,19-3.7,25.9-11.2C540.8,228,544.4,217.6,544.4,204.4z M711,125.4c7.1-12,16-21.8,26.8-29.4c10.8-7.5,22.6-11.8,35.6-12.7l5.4,75l-19.7,1.4c-15.4,1.1-26.5,4.9-33.5,11.4c-6.9,6.5-10,17.2-8.9,32l6.3,88.1l-70.4,5.1L638.1,94.8l70.4-5.1L711,125.4z M938.2,274.5l-61.3-78.8l5.6,82.6l-70.4,4.8l-18-265.8l70.4-4.8l9.7,143.3L924.5,73l84.4-5.7l-72.6,106.6l87.6,94.7L938.2,274.5L938.2,274.5z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1032.7,299.2c-3.8,0.3-4.9,5.7-20.6,6.9l-34.5,2.6l-0.1-0.1l-632.6,48.3c-6.9,0.5-13.4,3.7-18.3,8.9l-72.3,77.6v-72c0-4.5-3.6-7.8-8.1-7.5l-86.6,6.6l-102,6.8c-13,1-23.8,13.1-23.8,30.8c0,7.5,2.2,17,6,16.8c3.8-0.3,4.9-5.7,20.6-6.9l145.7-11.2c4.6-0.2,8.3,3.3,8.3,7.9v97.5c0,11.2,13.6,15.7,21.5,7.2l107.2-114.8c4.9-5.3,11.7-8.6,18.7-9.1l434.4-33.2l218.7-15.5c13-1,23.8-13.1,23.8-30.8C1038.6,308.4,1036.5,298.9,1032.7,299.2"
          />
        </g>
      </svg>
    </Box>
  );
}