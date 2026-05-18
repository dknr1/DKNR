export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, company, website, service, message, budget, timeline } = req.body;

  const notionRes = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: 'db3a1e341687425cbe36d93fd7894333' },
      properties: {
        Name:     { title:     [{ text: { content: name     || '' } }] },
        Email:    { email:     email || '' },
        Company:  { rich_text: [{ text: { content: company  || '' } }] },
        Service:  { rich_text: [{ text: { content: service  || '' } }] },
        Message:  { rich_text: [{ text: { content: message  || '' } }] },
        Budget:   { rich_text: [{ text: { content: budget   || '' } }] },
        Timeline: { rich_text: [{ text: { content: timeline || '' } }] },
        Status:   { select: { name: 'New' } },
        ...(website ? { Website: { url: website } } : {}),
      },
    }),
  });

  return res.status(notionRes.ok ? 200 : 500).json({ ok: notionRes.ok });
}
