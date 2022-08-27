import { motion } from 'framer-motion';
// material
import { Box, BoxProps } from '@mui/material';
//
import { varSmallClick, varMediumClick } from './variants';

// ----------------------------------------------------------------------

interface ButtonAnimateProps extends BoxProps {
  mediumClick?: boolean;
}

export default function ButtonAnimate({
  mediumClick = false,
  children,
  sx,
  ...other
}: ButtonAnimateProps): JSX.Element {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: 'inline-flex', ...sx }}
      {...other}
    >
      {children}
    </Box>
  );
}
