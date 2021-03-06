import React, {useState} from 'react'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {differenceInYears, format} from "date-fns";
import {deletePlayer} from "../API";

type Props = {
    player: PlayerI
    setCurrentPlayer: (player: PlayerI) => any
    handleClickOpen: () => void
    setPlayers: any
}

const PlayerCard: React.FC<Props> = ({player, setPlayers, setCurrentPlayer, handleClickOpen}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setCurrentPlayer(player)
        handleClickOpen()
        handleClose()
    };
    const handleDelete = () => {
        deletePlayer(player).then(({data: {Players}}) => {
            setPlayers(Players)
            handleClose()
        })
            .catch((err: Error) => console.log(err))
        handleClose()
    };
    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="settings" onClick={handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            </Menu>
                        </>
                    }
                    title={`${player.name} ${player.surname}`}
                    subheader={`${format(new Date(player.dateOfBirth), 'MM/dd/yyyy')} (Age ${differenceInYears(new Date(), new Date(player.dateOfBirth))})`}
                />
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar
                        alt={`${player.name} ${player.surname}`}
                        src={player.imageUrl ? player.imageUrl : "https://cdn.soccerwiki.org/images/player/missing_player.jpg"}
                        sx={{width: 150, height: 150}}
                    />
                </Box>
                <CardContent>
                    <Grid container spacing={0.5}
                          sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-around'}}>
                        <Grid item xs={6}>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText
                                        primary="Position"
                                        secondary={player.position}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Rating"
                                        secondary={player.rating}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Nationality"
                                        secondary={player.nationality}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="tShirt Number"
                                        secondary={player.tShirtNumber}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText
                                        primary="height"
                                        secondary={player.height}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="weight"
                                        secondary={player.weight}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="club"
                                        secondary={player.club}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default PlayerCard
