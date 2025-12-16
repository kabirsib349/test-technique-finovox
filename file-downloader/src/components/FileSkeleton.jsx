import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Skeleton,
    Divider
} from '@mui/material';
export default function FileSkeleton() {
    return (
        <List>
            {[1, 2, 3, 4, 5].map((item, index) => (
                <div key={index}>
                    <ListItem>
                        <ListItemIcon>
                            <Skeleton variant="circular" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Skeleton variant="text" width="60%" />}
                            secondary={<Skeleton variant="text" width="40%" />}
                        />
                        <IconButton>
                            <Skeleton variant="circular" width={40} height={40} />
                        </IconButton>
                    </ListItem>
                    {index < 4 && <Divider />}
                </div>
            ))}
        </List>
    );
}