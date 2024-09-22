import express from 'express';
import bodyParser from 'body-parser';
import atob from 'atob';
import fileType from 'file-type';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Helper function to extract numbers and alphabets
const separateData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    if (Array.isArray(data)) {
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string' && item.match(/^[a-zA-Z]$/)) {
                alphabets.push(item);
                if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
                    highestLowercase = item;
                }
            }
        });
    }

    return {
        numbers,
        alphabets,
        highestLowercase: highestLowercase ? [highestLowercase] : []
    };
};

// Helper function to validate file
const validateFile = async (file_b64) => {
    if (!file_b64) return { file_valid: false };

    try {
        const buffer = Buffer.from(file_b64, 'base64');
        const type = await fileType.fromBuffer(buffer);
        const fileSize = (buffer.length / 1024).toFixed(2);

        return {
            file_valid: true,
            file_mime_type: type ? type.mime : 'application/octet-stream',
            file_size_kb: fileSize
        };
    } catch (error) {
        return { file_valid: false };
    }
};

// POST /bfhl
app.post('/bfhl', async (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid 'data' field. It should be an array of numbers and alphabets."
        });
    }

    // Separate numbers and alphabets
    const { numbers, alphabets, highestLowercase } = separateData(data);

    // Handle file validation
    let fileInfo = { file_valid: false }; // Default to false if no file is provided
    if (file_b64) {
        fileInfo = await validateFile(file_b64); // Only validate if a file is provided
    }

    // Construct the response
    const response = {
        is_success: true,
        user_id: "Hari_Shanker_yadav_07092002",  
        email: "ha3154@srmist.edu.in", 
        roll_number: "RA2111003030105",  
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        ...fileInfo
    };

    res.json(response);
});

 
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});
 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
