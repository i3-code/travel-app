import React, { useRef } from 'react';
import useStyles from './styles';

import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';

export default function Search({value, onChange, onSearch, recorder, toggleRecorder }) {
  const inputRef = useRef(null)
  const classes = useStyles();

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const searchHandler= (e) => {
    onSearch(e.target.value.toLowerCase());
    onChange(e.target.value);
  }

  const enter=(e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  }

  const onDelete =() => {
    onChange('');
    onSearch('');
  }
  const speechRecognitionFunc = () => {
    if(recorder) return;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = language;
    recognition.addEventListener('result', (e) => {
      let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        transcript = value === '' ? transcript.split(' ')[transcript.split(' ').length-1] : transcript;
        const finalVal = value + transcript;
        onSearch(finalVal.toLowerCase());
        onChange(finalVal);
    });
    recognition.start()
  }

  const toggleMicro=() => {
    if(!recorder) {
      speechRecognitionFunc();
      inputRef.current.focus();
    }
    toggleRecorder(prev => !prev);
  }

  return (
    <div className={classes.search}>
      <IconButton
        aria-label="search"
        color="inherit"
        className={classes.searchIcon}
        onClick={e => e.target.blur()}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        ref={inputRef}
        autoFocus
        autoComplete={'off'}
        placeholder={t('PAGE_PLACEHOLDER.SEARCH')}
        value={value}
        onChange={searchHandler}
        onKeyUp={enter}
        spellCheck={false}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton aria-label="clear" color="inherit" onClick={onDelete} >
        <ClearIcon />
      </IconButton>
      <IconButton color="inherit" onClick={toggleMicro} >
        {recorder ? <MicIcon /> : <MicOffIcon />}
      </IconButton>
    </div>
  )
}
