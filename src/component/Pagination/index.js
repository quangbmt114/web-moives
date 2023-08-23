import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({onReload}) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value)
    onReload(value)
  };

  return (
    <div className='d-flex justify-center align-middle'>
        <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
    </div>
  );
}