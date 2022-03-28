import React, {useEffect, useState} from 'react'
import * as Yup from 'yup';
import {
    Button, Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    TextField
} from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useFormik} from "formik";
import {createPlayer, updatePlayer} from "../API";

type Props = {
    creatDialogStatus: boolean
    handleClose: () => void
    setPlayers: any
    setCurrentPlayer: any
    currentPlayer?: PlayerI
}

const CreatePlayer: React.FC<Props> = ({
                                           creatDialogStatus,
                                           handleClose,
                                           setPlayers,
                                           currentPlayer,
                                           setCurrentPlayer
                                       }) => {
    const [dateOfBirthValue, seDateOfBirthValue] = useState<Date | null>(null);

    const PlayerValidationSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        club: Yup.string().min(5, 'Too Short!').max(100, 'Too Long!').required('Required'),
        surname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        position: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        nationality: Yup.string().required('Required'),
        rating: Yup.number().integer()
            .min(0, 'Rating cant be below zero').max(100, 'Rating cant be More than 100').required('Required'),
        height: Yup.number().required('Required'),
        weight: Yup.number().required('Required'),
        tShirtNumber: Yup.number().required('Required'),
        dateOfBirth: Yup.date().required('Required'),
        imageUrl: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            position: '',
            nationality: '',
            rating: '',
            height: '',
            weight: '',
            tShirtNumber: '',
            dateOfBirth: '',
            imageUrl: '',
            club: '',
        },
        validationSchema: PlayerValidationSchema,
        onSubmit: (values: PlayerI, actions) => {
            if (currentPlayer) {
                updatePlayer(values)
                    .then(({data: {Players}}) => {
                        setPlayers(Players)
                        setCurrentPlayer(null)
                        handleClose()
                    })
                    .catch((err: Error) => console.log(err))
            } else {
                createPlayer(values)
                    .then(({data: {Players}}) => {
                        setPlayers(Players)
                        handleClose()
                    })
                    .catch((err: Error) => console.log(err))
            }

            actions.resetForm()
        },
    });

    useEffect(() => {
        formik.setFieldValue('dateOfBirth', dateOfBirthValue)
    }, [dateOfBirthValue])

    useEffect(() => {
        if (currentPlayer) {
            Object.keys(currentPlayer).map(key => {
                if (key === "dateOfBirth") {
                    seDateOfBirthValue(new Date(currentPlayer[key]))
                }
                formik.setFieldValue(key, currentPlayer[key])
            })
        }
    }, [currentPlayer])


    return (
        <>
            <Dialog open={creatDialogStatus} onClose={() => {
                handleClose();
                formik.resetForm();
            }} disableEscapeKeyDown>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Create Player</DialogTitle>
                    <DialogContent>
                        <Container sx={{py: 8}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.name && formik.touched.name)}
                                        helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ""}
                                        fullWidth
                                        id={"name"}
                                        label="Name"
                                        name="name"
                                        variant="filled"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.surname && formik.touched.surname)}
                                        helperText={formik.errors.surname && formik.touched.surname ? formik.errors.surname : ""}
                                        fullWidth
                                        label="Surname"
                                        name="surname"
                                        id="surname"
                                        variant="filled"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.surname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.position && formik.touched.position)}
                                        helperText={formik.errors.position && formik.touched.position ? formik.errors.position : ""}
                                        fullWidth
                                        label="Position"
                                        id="position"
                                        name="position"
                                        variant="filled"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.position}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.nationality && formik.touched.nationality)}
                                        helperText={formik.errors.nationality && formik.touched.nationality ? formik.errors.nationality : ""}
                                        fullWidth
                                        label="Nationality"
                                        id="nationality"
                                        name="nationality"
                                        variant="filled"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.nationality}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Rating"
                                        id="rating"
                                        name="rating"
                                        variant="filled"
                                        size="small"
                                        type="number"
                                        InputProps={{inputProps: {min: 0, max: 100}}}
                                        onChange={formik.handleChange}
                                        value={formik.values.rating}
                                        error={!!(formik.errors.rating && formik.touched.rating)}
                                        helperText={formik.errors.rating && formik.touched.rating ? formik.errors.rating : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.height && formik.touched.height)}
                                        helperText={formik.errors.height && formik.touched.height ? formik.errors.height : ""}
                                        fullWidth
                                        label="Height in Cm"
                                        id="height"
                                        name="height"
                                        variant="filled"
                                        size="small"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.height}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.weight && formik.touched.weight)}
                                        helperText={formik.errors.weight && formik.touched.weight ? formik.errors.weight : ""}
                                        fullWidth
                                        label="weight in Kg"
                                        id="weight"
                                        name="weight"
                                        variant="filled"
                                        size="small"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.weight}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.tShirtNumber && formik.touched.tShirtNumber)}
                                        helperText={formik.errors.tShirtNumber && formik.touched.tShirtNumber ? formik.errors.tShirtNumber : ""}
                                        fullWidth
                                        label="tShirt Number"
                                        id="tShirtNumber"
                                        name="tShirtNumber"
                                        variant="filled"
                                        size="small"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.tShirtNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Basic example"
                                            value={dateOfBirthValue}
                                            maxDate={new Date()}
                                            onChange={(newValue) => {
                                                seDateOfBirthValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.imageUrl && formik.touched.imageUrl)}
                                        helperText={formik.errors.imageUrl && formik.touched.imageUrl ? formik.errors.imageUrl : ""}
                                        fullWidth
                                        label="Image Url"
                                        id="imageUrl"
                                        name="imageUrl"
                                        variant="filled"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.imageUrl}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!!(formik.errors.club && formik.touched.club)}
                                        helperText={formik.errors.club && formik.touched.club ? formik.errors.club : ""}
                                        fullWidth
                                        label="Playing in Club"
                                        id="club"
                                        name="club"
                                        variant="filled"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.club}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose();
                            formik.resetForm()
                        }}>Cancel</Button>
                        <Button onClick={() => {
                            formik.handleSubmit()
                        }}>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default CreatePlayer
