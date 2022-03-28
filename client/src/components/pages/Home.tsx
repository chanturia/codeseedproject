import React, {useEffect, useState} from 'react'
import PlayerCard from "../playerCard";
import {
    Container,
    Fab, Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {getPlayers} from "../../API";
import CreateDialog from "../CreateDialog";


const CreatePlayer = () => {
    const [players, setPlayers] = useState<PlayerI[]>([]);
    const [creatDialogStatus, setCreatDialogStatus] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerI | undefined>();
    const handleClickOpen = () => {
        setCreatDialogStatus(true);
    };
    const handleClose = () => {
        setCreatDialogStatus(false);
    };
    useEffect(() => {
        getPlayers()
            .then(({data: {players}}: PlayerI[] | any) => setPlayers(players))
            .catch((err: Error) => console.log(err))
    }, [])
    return (
        <>
            <Container sx={{py: 8}}>
                <Grid container spacing={2}>
                    {
                        players && players.map((player) => {
                            return (
                                <Grid key={player._id} item xs={12} sm={6} md={4}>
                                    <PlayerCard player={player}
                                                setCurrentPlayer={setCurrentPlayer}
                                                handleClickOpen={handleClickOpen}
                                                setPlayers={setPlayers}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            <CreateDialog
                creatDialogStatus={creatDialogStatus}
                handleClose={handleClose}
                setPlayers={setPlayers}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
            />
            <Fab sx={{position: 'fixed', bottom: 20, right: 20}}
                 color="primary"
                 aria-label="add Player"
                 onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
        </>
    );
}

export default CreatePlayer
