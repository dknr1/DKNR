// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { name, email, company, website, service, message, budget, timeline } = req.body;

//   const notionRes = await fetch('https://api.notion.com/v1/pages', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
//       'Content-Type': 'application/json',
//       'Notion-Version': '2022-06-28',
//     },
//     body: JSON.stringify({
//       parent: { database_id: 'db3a1e341687425cbe36d93fd7894333' },
//       properties: {
//         Name:     { title:     [{ text: { content: name     || '' } }] },
//         Email:    { email:     email || '' },
//         Company:  { rich_text: [{ text: { content: company  || '' } }] },
//         Service:  { rich_text: [{ text: { content: service  || '' } }] },
//         Message:  { rich_text: [{ text: { content: message  || '' } }] },
//         Budget:   { rich_text: [{ text: { content: budget   || '' } }] },
//         Timeline: { rich_text: [{ text: { content: timeline || '' } }] },
//         Status:   { select: { name: 'New' } },
//         ...(website ? { Website: { url: website } } : {}),
//       },
//     }),
//   });

//   return res.status(notionRes.ok ? 200 : 500).json({ ok: notionRes.ok });
// }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, company, website, service, message, budget, timeline } = req.body;

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: process.env.DATABASE_ID },
        properties: {
          Name:     { title:     [{ text: { content: name || 'No Name Provided' } }] },
          Company:  { rich_text: [{ text: { content: company || '' } }] },
          Service:  { rich_text: [{ text: { content: service || '' } }] },
          Message:  { rich_text: [{ text: { content: message || '' } }] },
          Budget:   { rich_text: [{ text: { content: budget || '' } }] },
          Timeline: { rich_text: [{ text: { content: timeline || '' } }] },
          Status:   { select: { name: 'New' } },
          
          // Conditionally add strictly-formatted fields to prevent Notion API crashes
          ...(email ? { Email: { email: email } } : {}),
          ...(website ? { Website: { url: website } } : {}),
        },
      }),
    });

    // Parse the response so we can actually read Notion's error messages
    const data = await notionRes.json();

    if (!notionRes.ok) {
      console.error('Notion API Error:', data);
      return res.status(500).json({ error: data.message });
    }

    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
