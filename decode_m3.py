d:\khdm\m3.png  
import json, base64, os

src = os.path.join(
    os.environ['APPDATA'], 'Claude', 'local-agent-mode-sessions',
    '5740633c-e7b7-4e15-af3b-8c3a253175f6',
    '6bf7616d-ecf3-412a-b503-cd7b4ca3b448',
    'local_569c4bc2-0be7-4087-be11-1ea07b8e4925',
    '.claude', 'projects',
    'C--Users-hiche-AppData-Roaming-Claude-local-agent-mode-sessions-5740633c-e7b7-4e15-af3b-8c3a253175f6-6bf7616d-ecf3-412a-b503-cd7b4ca3b448-local-569c4bc2-0be7-4087-be11-1ea07b8e4925-outputs',
    'ea587e55-b378-454a-bfae-b1aa47e3f37b', 'tool-results',
    'mcp-ce37d2aa-f5af-40ac-b996-eb476a51881c-download_file_content-1778382341317.txt'
)

dest = os.path.join(os.path.dirname(__file__), 'assets', 'img5.png')

with open(src, 'r') as f:
    data = json.load(f)

img_bytes = base64.b64decode(data['content'])
with open(dest, 'wb') as f:
    f.write(img_bytes)

print(f'Done — saved {len(img_bytes):,} bytes to {dest}')
