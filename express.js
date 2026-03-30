const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient('https://vujppxrdwkprvkiqjetx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1anBweHJkd2twcnZraXFqZXR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2ODY1NCwiZXhwIjoyMDkwNDQ0NjU0fQ.XFDApsqcKPDUaOVNbeJxLCFCXtFL8ZWvWnlY6zzTEs4');

app.post('/comment', async (req, res) => {
    const { message, sender } = req.body;

    const { error } = await supabase
        .from('guestbook')
        .insert([{ name: sender, message: message }]);

    if (error) {
        console.error(error);
        return res.status(500).send('Failed to save');
    }

    res.send('Saved');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});
