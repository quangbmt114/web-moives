import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function HoverRating(props) {
  const  handleGetRating = (e)=>{
    props.onGetRating(e)
  }
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Hãy là người đầu tiên đánh giá</Typography>
      <Rating name="customized-10" defaultValue={2} max={10} onClick={(e)=>handleGetRating(e.target.value)}/>
    </Box>
  );
}