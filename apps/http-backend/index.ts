import { prismaclient } from "@repo/db/client";
import express from "express";
const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
	try {
		const users = await prismaclient.user.findMany();
		return res.json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: `Error occurred: ${error}`,
		});
	}
});

app.post("/user", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			res.status(400).json({
				message: "Username and password are required",
			});
		}

        const user= await prismaclient.user.create({
            data:{
                username,
                password
            }
        })
        if(user){
            return res.json({
                message:"User created successfully",
                user
            })
        }
	} catch (error) {
        return res.status(500).json({
            message:`Error occurred:${error}`
        })
    }
});

app.listen(8000, () => {
	console.log("http backend listening at 8000");
});
