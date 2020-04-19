import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {getSource, charactersForConfiguration, allDescriptions, getGoodOrEvil, GOOD_TEAM} from "../model/constants";
import {evilColor, goodColor} from "./CharacterInfo";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import BeenhereIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Divider from "@material-ui/core/Divider/Divider";
import {Collapse} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
          //  maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        checkBox:{color:theme.palette.secondary.main},
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export default function SelectConfigurationList({selection,setSelection}:{selection:{description:string, character:string,quantity:number}[],setSelection:any}) {
    const classes = useStyles();
    const [checked, setCheckedRow] :[number[],any] = React.useState([0,1]);
    const [open, setOpen]:[number[],any] = React.useState([]);

    const setChecked=(newChecked:number[])=>{
        setCheckedRow(newChecked)
    }
    const handleToggleGeneric = (checkedState: number[], setCheckedState: (a: number[]) => void) =>(value: number) => ()=>{
        const currentIndex = checkedState.indexOf(value);
        const newChecked = [...checkedState];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedState(newChecked);
    };

    const handleToggle = (character:string)=> ()=>{
        const selections =selection.map(a=>a)//.filter(infos=>infos.character!==character);
        let thisChar = selections.find(infos=>infos.character===character)
        thisChar= thisChar!
        thisChar.quantity=(!thisChar.quantity?1:0)
        // const newCharSelection = {...thisChar,quantity:(!thisChar.quantity?1:0)};
        setSelection(selections)
    };

    const handleClickDescription = handleToggleGeneric(open,setOpen);

    return (
        <List dense className={classes.root}>


    {selection.map(({description, character,quantity},index) => {
        const labelId = `checkbox-list-secondary-label-${character}`;
        const isGood = getGoodOrEvil(character)===GOOD_TEAM;

        return (<div>
            <ListItem key={character} button  style={{color:(isGood?goodColor:evilColor)}} onClick={handleClickDescription(index)}>
        <ListItemAvatar  style={{color:(isGood?goodColor:evilColor)}}>
            <Avatar
                alt={`Avatar n°${character + 1}`}
        src={getSource(character)}
        />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={character} />
        <ListItemSecondaryAction>
        <Checkbox edge="end" onChange={handleToggle(character)} checked={quantity>0} inputProps={{ 'aria-labelledby': labelId }} color="secondary" />
        </ListItemSecondaryAction>

        </ListItem>
            <Collapse in={open.indexOf(index) !== -1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem className={classes.nested}>
    <ListItemText primary={description} />
    </ListItem>
    </List>
        </Collapse>
            </div>
    );
    })}
    </List>
);
}