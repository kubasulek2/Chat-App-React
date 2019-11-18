import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import {orange, amber} from '@material-ui/core/colors';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
	'@global': {
		'html, body': {
			width: '100%',
			height: '100%',
		}
	}
}));


const withStyles = WC => {

	const WithStyles = props => {
		const globalStyles = useStyles();
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<WC style={globalStyles} {...props} />
			</ThemeProvider>
		);
	};
	return WithStyles;
};

export default withStyles;