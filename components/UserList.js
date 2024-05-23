'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser, updateUser } from '@/store/slices/usersSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: 'lightgrey',
}));

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ id: '', name: '', email: '', phone: '', address: { city: '', zipcode: '' } });
  const [editUser, setEditUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setNewUser({ id: '', name: '', email: '', phone: '', address: { city: '', zipcode: '' } });
    setDialogOpen(false); // Close the dialog after adding user
  };

  const handleDeleteUser = (userObj) => {
    setUserToDelete(userObj);
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setDialogOpen(true); // Open the dialog when editing user
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(editUser));
    setEditUser(null);
    setDialogOpen(false); // Close the dialog after updating user
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditUser(null);
  };
  const confirmDeleteUser = () => {
    dispatch(deleteUser(userToDelete.id));
    setDeleteDialogOpen(false);
    setUserToDelete(null); // Reset the user to delete
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Grid container justifyContent={"space-between"} p={1}>
        <Typography variant="h5" gutterBottom>User List</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} >Add User</Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Zip Code</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell>{user.address.zipcode}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditUser(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              label="ID"
              fullWidth
              margin="dense"
              value={editUser ? editUser.id : newUser.id}
              onChange={(e) => {
                const value = e.target.value;
                if (editUser) setEditUser({ ...editUser, id: value });
                else setNewUser({ ...newUser, id: value });
              }}
            />
            <TextField
              label="Name"
              fullWidth
              margin="dense"
              value={editUser ? editUser.name : newUser.name}
              onChange={(e) => {
                const value = e.target.value;
                if (editUser) setEditUser({ ...editUser, name: value });
                else setNewUser({ ...newUser, name: value });
              }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="dense"
              value={editUser ? editUser.email : newUser.email}
              onChange={(e) => {
                const value = e.target.value;
                if (editUser) setEditUser({ ...editUser, email: value });
                else setNewUser({ ...newUser, email: value });
              }}
            />
            <TextField
              label="Phone"
              fullWidth
              margin="dense"
              value={editUser ? editUser.phone : newUser.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (editUser) setEditUser({ ...editUser, phone: value });
                else setNewUser({ ...newUser, phone: value });
              }}
            />
            <TextField
              label="City"
              fullWidth
              margin="dense"
              value={editUser ? editUser.address.city : newUser.address.city}
              onChange={(e) => {
                const value = e.target.value;
                if (editUser) setEditUser({ ...editUser, address: { ...editUser.address, city: value } });
                else setNewUser({ ...newUser, address: { ...newUser.address, city: value } });
              }}
            />
            <TextField
              label="Zip Code"
              fullWidth
              margin="dense"
              value={editUser ? editUser.address.zipcode : newUser.address.zipcode}
              onChange={(e) => {
                const value = e.target.value;
                if (editUser) setEditUser({ ...editUser, address: { ...editUser.address, zipcode: value } });
                else setNewUser({ ...newUser, address: { ...newUser.address, zipcode: value } });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} startIcon={<CancelIcon />} color="inherit">Cancel</Button>
          <Button onClick={editUser ? handleUpdateUser : handleAddUser} startIcon={editUser ? <SaveIcon /> : <AddIcon />} color="primary">
            {editUser ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <strong>{userToDelete?.name}</strong> ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} startIcon={<CancelIcon />} color="inherit">Cancel</Button>
          <Button onClick={confirmDeleteUser} startIcon={<DeleteIcon />} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default UserList;
