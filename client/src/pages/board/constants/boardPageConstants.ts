export const columnBoxSx = (isFirst: boolean) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '60vh',
  borderLeft: isFirst ? 'none' : '1px solid #ccc',
  pl: isFirst ? 0 : 2,
});

export const statusTitleSx = {
  fontWeight: 'bold',
  color: '#1976d2',
  mb: 2,
  textAlign: 'center',
};

export const taskCardSx = {
  p: 1.5,
  borderRadius: 2,
  border: '2px solid #333',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderColor: 'primary.main',
    backgroundColor: 'background.paper',
  },
};

export const scrollWrapperSx = {
  p: 2,
  overflowX: 'auto',
};
