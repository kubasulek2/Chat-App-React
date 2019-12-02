import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../styles/theme';

const useStyles = makeStyles(({ palette }) => ({
	'@global': {
		'html, body': {
			height: '100%',
		},
		'#root': {
			height: '100%',
			display: 'flex',
			'flex-flow': 'column',
		},
		a: {
			'&,&:hover,&:active,&:visited': {
				color: palette.primary.light,
			}
		},
		'span.styled': { 
			color: '#417cab', 
			textTransform: 'uppercase', 
			fontWeight: 'bold' 
		},
		'*::-webkit-scrollbar': {
			width: '0.4em'
		},
		'*::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(66,66,66,.7)',
			outline: '1px solid ' + palette.background.paper
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
