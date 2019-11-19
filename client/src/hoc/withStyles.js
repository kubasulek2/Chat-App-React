import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../styles/theme';

const useStyles = makeStyles(({palette}) => ({
	'@global': {
		'html, body': {
			height: '100%',
		},
		'#root': {
			height: '100%',
			display: 'flex',
			'flex-flow': 'column',
		},
		a:{
			'&,&:hover,&:active,&:visited': {
				color: palette.primary.light,
				textDecoration: 'none'
			}
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