import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons-react';
import Link from 'next/link';

import { useLogout } from '@/utils/logout';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const user = useSelector((state) => state.user?.user);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const { handleLogout, requestLogout, cancelLogout, loading, confirmLogout } = useLogout();

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt={user?.first_name || 'Usuário'}
            src={user?.profile_picture || "/images/profile/user-1.jpg"}
            sx={{height: 40, width: 40}}
          />

          <Box>
            <Typography variant="h6">
              {user?.first_name || 'Usuário'}
            </Typography>
            <Typography variant="caption">
              {user?.role?.name || 'Aluno'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={requestLogout}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : <IconPower size="20" />}
              </IconButton>
            </Tooltip>
          </Box>

          <Dialog
            open={confirmLogout}
            onClose={cancelLogout}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmar Logout</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza de que deseja sair?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelLogout} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleLogout} color="primary" autoFocus>
                Sair
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
