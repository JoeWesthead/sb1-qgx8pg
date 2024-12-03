import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Link,
  InputAdornment,
  Popover,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import { HelpCircle, Upload, Plus } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { Preview } from './Preview';
import { usePreview } from '../context/PreviewContext';
import { EditableField } from './common/EditableField';
import { SectionFooter } from './common/SectionFooter';
import { InformationCollectionSection } from './BeforeAfterChat/InformationCollectionSection';
import { FollowupFormSection } from './BeforeAfterChat/FollowupFormSection';

const defaultPrimaryColors = [
  '#3D3683',
  '#2F6BC6',
  '#E35C53',
  '#007F88',
  '#3E9231',
  '#F1A718',
];

const defaultSecondaryColors = ['#2563EB', '#E5E7EB', '#22C55E'];

interface ThemeData {
  language: string;
  primaryColor: string;
  secondaryColor: string;
  hideMobile: boolean;
}

export function ChatAppearance() {
  const { isPreviewOpen } = usePreview();
  const [initialData] = useState<ThemeData>(() => {
    const saved = localStorage.getItem('previewSettings');
    return saved
      ? JSON.parse(saved)
      : {
          language: 'English (United States)',
          primaryColor: '#3D3683',
          secondaryColor: '#2563EB',
          hideMobile: false,
        };
  });
  const [data, setData] = useState<ThemeData>(initialData);
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string | null>(
    null
  );
  const [customSecondaryColor, setCustomSecondaryColor] = useState<
    string | null
  >(null);
  const [colorPickerAnchor, setColorPickerAnchor] =
    useState<HTMLElement | null>(null);
  const [activeColorType, setActiveColorType] = useState<
    'primary' | 'secondary' | null
  >(null);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(initialData);

  const handleColorPickerOpen = (
    event: React.MouseEvent<HTMLElement>,
    type: 'primary' | 'secondary'
  ) => {
    setColorPickerAnchor(event.currentTarget);
    setActiveColorType(type);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setActiveColorType(null);
  };

  const handleCustomColorSelect = (color: string) => {
    if (activeColorType === 'primary') {
      setData({ ...data, primaryColor: color });
      setCustomPrimaryColor(color);
    } else {
      setData({ ...data, secondaryColor: color });
      setCustomSecondaryColor(color);
    }
    handleColorPickerClose();
  };

  const handleSave = () => {
    localStorage.setItem('previewSettings', JSON.stringify(data));
  };

  const handleCancel = () => {
    setData(initialData);
    setCustomPrimaryColor(null);
    setCustomSecondaryColor(null);
  };

  const ColorButton = ({
    color,
    selected,
    onClick,
    isCustom = false,
  }: {
    color: string;
    selected: boolean;
    onClick: () => void;
    isCustom?: boolean;
  }) => (
    <Box
      onClick={onClick}
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: isCustom ? 'action.hover' : color,
        cursor: 'pointer',
        border: selected ? '2px solid #000' : '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      {isCustom && <Plus size={16} />}
    </Box>
  );

  const primaryColors = [
    ...defaultPrimaryColors,
    ...(customPrimaryColor && !defaultPrimaryColors.includes(customPrimaryColor)
      ? [customPrimaryColor]
      : []),
  ];

  const secondaryColors = [
    ...defaultSecondaryColors,
    ...(customSecondaryColor &&
    !defaultSecondaryColors.includes(customSecondaryColor)
      ? [customSecondaryColor]
      : []),
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: 8,
          pt: 2,
          overflow: 'auto',
          // transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          marginRight: isPreviewOpen ? '400px' : 0,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Widget Appearance
        </Typography>

        <Box>
          <Typography variant="h6">Theme</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Control how the chat widget appears on your website. Customize the
            widget further with our <Link href="#">JavaScript API</Link>.
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 6, position: 'relative' }} variant="outlined">
          {/* Chat Language */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Localization (default)
            </Typography>

            <Select
              value={data.language}
              onChange={(e) => setData({ ...data, language: e.target.value })}
              fullWidth
              sx={{ maxWidth: 400 }}
              size="small"
            >
              <MenuItem value="English (United States)">
                English (United States)
              </MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </Select>
          </Box>

          {/* Primary Theme Color */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2">Primary Theme Color</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Enter a hex value or use one of our pre-selected WCAG 2.1 AA
              accessible colors
            </Typography>

            <EditableField
              value={data.primaryColor.replace('#', '')}
              onChange={(value) =>
                setData({ ...data, primaryColor: `#${value}` })
              }
              size="small"
              maxWidth={200}
              placeholder="Enter hex color"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {primaryColors.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  selected={color === data.primaryColor}
                  onClick={() => setData({ ...data, primaryColor: color })}
                />
              ))}
              <ColorButton
                color=""
                selected={false}
                onClick={(e: any) => handleColorPickerOpen(e, 'primary')}
                isCustom
              />
            </Box>
          </Box>

          {/* Secondary Color */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="subtitle2">Secondary Theme Color</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Enter a hex value or use one of our pre-selected WCAG 2.1 AA
              accessible colors
            </Typography>

            <EditableField
              value={data.secondaryColor.replace('#', '')}
              onChange={(value) =>
                setData({ ...data, secondaryColor: `#${value}` })
              }
              size="small"
              maxWidth={200}
              placeholder="Enter hex color"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {secondaryColors.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  selected={color === data.secondaryColor}
                  onClick={() => setData({ ...data, secondaryColor: color })}
                />
              ))}
              <ColorButton
                color=""
                selected={false}
                onClick={(e: any) => handleColorPickerOpen(e, 'secondary')}
                isCustom
              />
            </Box>
          </Box>

          {/* Mobile Chat Widget */}
          <Box>
            <Typography variant="subtitle2">Mobile Chat Widget</Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={data.hideMobile}
                  onChange={(e) =>
                    setData({ ...data, hideMobile: e.target.checked })
                  }
                />
              }
              label="Hide Chat on Mobile"
            />
          </Box>

          <SectionFooter
            hasChanges={hasChanges}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Paper>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pre-Chat Survey
          </Typography>
          <InformationCollectionSection
            initialData={{ fields: [] }}
            onSave={() => {}}
            hasAIFields={false}
          />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Follow-up Survey
          </Typography>
          <FollowupFormSection
            initialData={{ fields: [] }}
            onSave={() => {}}
            hasAIFields={false}
          />
        </Box>
      </Box>

      <Preview />

      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={handleColorPickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            p: 2,
            boxShadow: 3,
          },
        }}
      >
        <HexColorPicker
          color={
            activeColorType === 'primary'
              ? data.primaryColor
              : data.secondaryColor
          }
          onChange={handleCustomColorSelect}
        />
      </Popover>
    </Box>
  );
}
