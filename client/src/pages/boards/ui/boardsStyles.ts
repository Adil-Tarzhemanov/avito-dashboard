import { styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  maxWidth: 1200,
  marginInline: 'auto',
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  width: '100%',
  transition: theme.transitions.create('box-shadow', {
    duration: theme.transitions.duration.short,
  }),
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const CardTitle = styled(Typography)(() => ({
  fontWeight: 400,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  paddingRight: '10px',
}));
