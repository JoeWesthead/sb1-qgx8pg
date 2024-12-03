import { createTheme, alpha } from '@mui/material';

const getDesignTokens = (mode: 'light' | 'dark') => ({
  cssVariables: true,
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#7C3AED' : '#E040FB',
      contrastText: mode === 'light' ? '#FFF' : '#000',
    },
    secondary: {
      main: '#14B8A6',
    },
    background: {
      default: mode === 'light' ? '#fff' : '#121212',
      paper: mode === 'light' ? '#fff' : '#1E1E1E',
    },
    divider: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12),
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontFeatureSettings: '"ss08"', // Enable square quotes
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontSize: 20,
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.875rem',
      color:
        mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.2s ease, color 0.2s ease',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.23),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7C3AED',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '& + .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& + .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'soft', color: 'default' },
          style: {
            backgroundColor: mode === 'light' ? '#F3F4F6' : alpha('#fff', 0.1),
            color: mode === 'light' ? '#1F2937' : '#E5E7EB',
            cursor: 'default',
            '&:hover': {
              backgroundColor:
                mode === 'light' ? '#F3F4F6' : alpha('#fff', 0.1),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.15),
              },
            },
          },
        },
        {
          props: { variant: 'soft', color: 'primary' },
          style: {
            backgroundColor: alpha('#7C3AED', 0.08),
            color: '#7C3AED',
            cursor: 'default',
            '&:hover': {
              backgroundColor: alpha('#7C3AED', 0.08),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha('#7C3AED', 0.12),
              },
            },
          },
        },
        {
          props: { variant: 'soft', color: 'secondary' },
          style: {
            backgroundColor: alpha('#14B8A6', 0.08),
            color: '#14B8A6',
            cursor: 'default',
            '&:hover': {
              backgroundColor: alpha('#14B8A6', 0.08),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha('#14B8A6', 0.12),
              },
            },
          },
        },
        {
          props: { variant: 'soft', color: 'error' },
          style: {
            backgroundColor: alpha('#EF4444', 0.08),
            color: '#EF4444',
            cursor: 'default',
            '&:hover': {
              backgroundColor: alpha('#EF4444', 0.08),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha('#EF4444', 0.12),
              },
            },
          },
        },
        {
          props: { variant: 'soft', color: 'warning' },
          style: {
            backgroundColor: alpha('#F59E0B', 0.08),
            color: '#F59E0B',
            cursor: 'default',
            '&:hover': {
              backgroundColor: alpha('#F59E0B', 0.08),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha('#F59E0B', 0.12),
              },
            },
          },
        },
        {
          props: { variant: 'soft', color: 'info' },
          style: {
            backgroundColor: alpha('#3B82F6', 0.08),
            color: '#3B82F6',
            cursor: 'default',
            '&:hover': {
              backgroundColor: alpha('#3B82F6', 0.08),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha('#3B82F6', 0.12),
              },
            },
          },
        },
        {
          props: { variant: 'soft', color: 'success' },
          style: {
            backgroundColor: alpha('#10B981', 0.08),
            color: '#10B981',
            cursor: 'default',
            '&:hover': {
              backgroundColor: alpha('#10B981', 0.08),
            },
            '&[data-clickable="true"]': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha('#10B981', 0.12),
              },
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'soft' },
          style: {
            backgroundColor: alpha('#7C3AED', 0.08),
            '&:hover': {
              backgroundColor: alpha('#7C3AED', 0.12),
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: 'all 0.2s ease',
          fontSize: '0.875rem',
        },
        text: {
          '&:hover': {
            backgroundColor: alpha('#7C3AED', 0.08),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            transition: 'background-color 0.2s ease',
            backgroundColor: mode === 'dark' ? alpha('#fff', 0.05) : undefined,
            fontSize: '0.875rem',
            '& .MuiInputLabel-root': {
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${
            mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12)
          }`,
          fontSize: '0.875rem',
        },
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'light' ? '#F9FAFB' : alpha('#fff', 0.05),
          color: mode === 'light' ? '#374151' : '#E5E7EB',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12),
          color: mode === 'light' ? '#374151' : '#E5E7EB',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: 'background-color 0.2s ease',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transition: 'background-color 0.2s ease',
          borderRight: `1px solid ${
            mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12)
          }`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12),
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
          '&.Mui-selected': {
            backgroundColor:
              mode === 'light'
                ? alpha('#7C3AED', 0.08)
                : alpha('#7C3AED', 0.16),
            '&:hover': {
              backgroundColor:
                mode === 'light'
                  ? alpha('#7C3AED', 0.12)
                  : alpha('#7C3AED', 0.24),
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme(getDesignTokens(mode));
};

export default createAppTheme;
