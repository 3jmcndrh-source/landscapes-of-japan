# GSC API Setup — One-Time

This lets Claude resubmit the sitemap programmatically without manual UI clicks.

## Steps

1. **GCP Console**
   - Open https://console.cloud.google.com/
   - Create a new project (or reuse one) — any name, e.g. `landscapes-gsc`.

2. **Enable the Search Console API**
   - https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
   - Select your project → **ENABLE**.

3. **Create a Service Account**
   - https://console.cloud.google.com/iam-admin/serviceaccounts
   - **CREATE SERVICE ACCOUNT**
   - Name: `gsc-sitemap-bot` (any name) → **CREATE AND CONTINUE** → skip optional → **DONE**.
   - Click the new service account → **KEYS** tab → **ADD KEY** → **Create new key** → **JSON** → **CREATE**.
   - A JSON file downloads. **Rename it to `gsc-service-account.json`** and move it to this project root (same folder as `package.json`). This file is gitignored.
   - Copy the service account email shown on the page (looks like `gsc-sitemap-bot@landscapes-gsc.iam.gserviceaccount.com`).

4. **Grant GSC Access**
   - Open https://search.google.com/search-console
   - Select property `landscapes-of-japan.vercel.app`
   - Left menu → **設定** → **ユーザーと権限** → **ユーザーを追加**
   - Paste the service account email, permission = **所有者** (Owner)
   - **追加**

## Usage

```bash
node resubmit-sitemap.mjs
```

Outputs `✓ Sitemap resubmitted` on success. Google re-crawls within minutes–hours; check GSC → サイトマップ for updated URL count.

## Security

- `gsc-service-account.json` is in `.gitignore`. Never commit it.
- Treat the JSON key like a password — anyone with it can modify GSC data.
- To revoke: GCP Console → Service Account → KEYS → delete the key, or delete the entire service account.
