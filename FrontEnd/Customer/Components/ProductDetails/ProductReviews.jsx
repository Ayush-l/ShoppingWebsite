import React from "react";
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

export const ProductReviews=({name,date,value,message})=>{
    return (
        <div className="ml-5">
            <Grid container spacing={2} gap={3} className="grid grid-cols-2 items-start">
                <Grid className="mt-2">
                    <Box>
                        <Avatar className="text-white mr-0" sx={{width:56,height:56, bgcolor:"#9155fd"}}>{name[0]}</Avatar>
                    </Box>
                </Grid>

                <Grid>
                    <div className="space-y-0">
                        <div className="ml-1">
                            <p>{name}</p>
                            <p>{date}</p>
                            
                        </div>
                        <Rating value ={value} className="ml-0" readOnly/>

                    </div>
                </Grid>

            </Grid>
            <p className="ml-21 sm:mr-21 lg:mr-50">{message}</p>
        </div>
    )
}