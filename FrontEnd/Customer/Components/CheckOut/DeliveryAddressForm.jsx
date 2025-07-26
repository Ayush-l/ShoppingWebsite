import React from "react";
import { Grid, Button, TextField } from "@mui/material"
import AddressCard from "../AddressCard/AddressCard"
import { useNavigate } from "react-router-dom";

export const DeliveryAddressForm = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const personDetails={
            "firstName":data.get("firstName"),
            "lastName":data.get("lastName"),
            "street":data.get("street"),
            "city":data.get("city"),
            "zipCode":data.get("zipCode"),
            "mobile":data.get("phoneNumber"),
            "state":data.get("state"),
        }
        const p=fetch("http://localhost:8080/address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(personDetails)
        })
        p.then((res)=>{
            if(!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((result)=>{
            navigate(`/checkout?step=3&id=${result}`)
            window.location.reload();
        })
        .catch(()=>{
            alert("SomeError Occurred")
            localStorage.removeItem("jwt");
            navigate("/login");
        })
        e.currentTarget.reset();
    }
    return (
        <div>
            <Grid container className='mt-5'>
                <Grid className="rounded-e-md shadow-md w-full justify-around grid mx-1 overflow-y-auto" size={{ xs: 12, sm: 4 }}>
                    <div className="mt-5 px-5 max-h-[200px] cursor-pointer w-full border-b-gray-400">
                        <AddressCard />
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }} className="rounded mx-1 p-8 shadow">
                    <h1 className="text-center font-semibold">Address</h1>
                    <form onSubmit={handleSubmit}>
                        <Grid>
                            <Grid size={12} container className="my-5 gap-5 space-x-5">
                                <Grid size={{ xs: 11.3, sm: 5.5 }}>
                                    <TextField
                                        label="First Name"
                                        id="firstName"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        autoComplete="given-name"
                                        fullWidth
                                        />
                                </Grid>
                                <Grid size={{ xs: 11.3, sm: 5.5 }}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        id="lastName"
                                        name="lastName"
                                        variant="outlined"
                                        required
                                        autoComplete="family-name"
                                    />
                                </Grid>
                            </Grid>
                            <Grid size={11.3} className="my-1">
                                <TextField
                                    label="Street"
                                    id="street"
                                    name="street"
                                    fullWidth
                                    variant="outlined"
                                    autoComplete="street-address"
                                    required
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid container className="gap-50 my-5 space-x-5">
                                <Grid size={{ sm: 5.5, xs: 11.3 }} className="my-1">
                                    <TextField
                                        label="City"
                                        id="city"
                                        name="city"
                                        fullWidth
                                        variant="outlined"
                                        autoComplete="address-level2"
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 11.3, sm: 5.5 }} className="my-1">
                                    <TextField
                                        label="State/Province/Region"
                                        id="state"
                                        name="state"
                                        fullWidth
                                        variant="outlined"
                                        autoComplete="address-level1"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className="gap-50 my-5 space-x-5">
                                <Grid size={{ sm: 5.5, xs: 11.3 }} className="my-1">
                                    <TextField
                                        label="Phone Number"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        fullWidth
                                        variant="outlined"
                                        autoComplete="tel"
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 11.3, sm: 5.5 }} className="my-1">
                                    <TextField
                                        label="Zip/Postal Code"
                                        id="zipCode"
                                        name="zipCode"
                                        fullWidth
                                        variant="outlined"
                                        autoComplete="postal-code"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }} type="submit" onSubmit={()=>handleSubmit(e)} size="large" variant="contained">Deliver Here</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default DeliveryAddressForm;