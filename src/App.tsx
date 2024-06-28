import { Box, Button, Grid, Stack, TextField, ThemeProvider, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import theme from './theme';
import { ChangeEvent, useState } from 'react';

function App() {
  const [textValue, setTextValue] = useState<string>('');
  const [textEditValue, setTextEditValue] = useState<string>('');
  const [pendingActivities, setPendingActivities] = useState<string[]>([])
  const [editingActivity, setEditingActivity] = useState<string>('')
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTextValue(event.target.value);
  };
  const handleEditInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setTextEditValue(event.target.value);
  };
  const handleAddActivity = () => {
    setPendingActivities([...pendingActivities, textValue])
    setTextValue('');
  }
  const handleAddCompletedActivity = (activity: string) => {
    setCompletedActivities([...completedActivities, activity])
    setPendingActivities(pendingActivities.filter((activityItem: string) => activityItem !== activity))
    setTextValue('');
  }
  const handleDeleteActivity = (targetActivity: string) => {
    setPendingActivities(pendingActivities.filter((activity: string) => activity !== targetActivity))
  }
  const handleEditActivity = (targetIndex: number) => {
    const newArray = [...pendingActivities]
    newArray[targetIndex] = textEditValue
    setPendingActivities(newArray)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box width={"100vw"} bgcolor={"#4b4b4b"} height={"100vh"}>
        <Stack justifyContent={'center'} alignItems={'center'} direction={"row"} px={5} height={"100%"}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h1' fontSize={64} color={"#F6f6f6"} textAlign={"center"} fontWeight={"bold"}>To do list</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack bgcolor={"#222"} p={3} borderRadius={3} spacing={2}>
                <Typography variant='h2' fontSize={28}>Agrega nuevas actividades</Typography>
                <Grid container alignItems={"center"}>
                  <Grid item xs={10}>
                    <TextField value={textValue} fullWidth placeholder='Actividad' variant="outlined" onChange={handleChange} sx={{ backgroundColor: "#F6f6f6", borderRadius: 2 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Stack justifyContent={'center'} alignItems={'center'}>
                      <AddBoxIcon sx={{ fontSize: 64, cursor: "pointer" }} onClick={() => handleAddActivity()} />
                    </Stack>
                  </Grid>
                </Grid>
                {pendingActivities.length > 0 && pendingActivities.map((activity: string, index: number) => {
                  if (editingActivity === activity) {
                    return (
                      <Grid container alignItems={"center"}>
                        <Grid item xs={10}>
                          <TextField value={textEditValue} fullWidth placeholder='Actividad' variant="outlined" onChange={handleEditInput} sx={{ backgroundColor: "#F6f6f6", borderRadius: 2 }} />
                        </Grid>
                        <Grid item xs={2}>
                          <Stack justifyContent={'center'} alignItems={'center'}>
                            <CheckBoxIcon sx={{ fontSize: 64, cursor: "pointer" }} onClick={() => handleEditActivity(index)} />
                          </Stack>
                        </Grid>
                      </Grid>
                    )
                  } else {
                    return (
                      <Stack key={index} direction={"row"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"#4b4b4baa"} p={3} borderRadius={3}>
                        <Typography variant='h2' fontSize={16}>{activity}</Typography>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
                          <EditIcon sx={{ cursor: "pointer" }} onClick={() => {
                            setTextEditValue(activity)
                            setEditingActivity(activity)
                          }} />
                          <TaskAltIcon sx={{ cursor: "pointer" }} onClick={() => handleAddCompletedActivity(activity)} />
                          <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => handleDeleteActivity(activity)} />
                        </Stack>
                      </Stack>
                    )
                  }
                })}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack bgcolor={"#222"} p={3} borderRadius={3} spacing={2}>
                <Typography variant='h2' fontSize={28}>Actividades completadas</Typography>
                {completedActivities.length > 0 && completedActivities.map((activity: string, index: number) => (
                  <Stack key={index} direction={"row"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"#4b4b4baa"} p={3} borderRadius={3}>
                    <Typography variant='h2' fontSize={16}>{activity}</Typography>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
                      <EditIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setTextEditValue(activity)
                        setEditingActivity(activity)
                      }} />
                      <TaskAltIcon sx={{ cursor: "pointer" }} onClick={() => handleAddCompletedActivity(activity)} />
                      <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => handleDeleteActivity(activity)} />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>

        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default App
