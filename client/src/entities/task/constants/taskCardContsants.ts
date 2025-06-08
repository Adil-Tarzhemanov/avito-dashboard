export const cardStyles = {
  height: 140,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 4,
    borderColor: 'primary.main',
  },
};

export const boardLabelStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '3px 5px',
  margin: '7px',
  color: 'text.secondary',
  fontWeight: 500,
};
