import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';

function headers(token?: string) {
  const h: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (token) h['Authorization'] = `token ${token}`;
  return h;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const owner = url.searchParams.get('owner') || 'javatcoding1';
    const repo = url.searchParams.get('repo') || 'landingpage1';
    const per_page = url.searchParams.get('per_page') || '100';

    const token = process.env.GH_TOKEN || process.env.NEXT_PUBLIC_GH_TOKEN || undefined;

    const repoUrl = `${GITHUB_API}/repos/${owner}/${repo}`;
    const contribUrl = `${repoUrl}/contributors?per_page=${per_page}`;
    const langUrl = `${repoUrl}/languages`;

    const [rRes, cRes, lRes] = await Promise.all([
      fetch(repoUrl, { headers: headers(token) }),
      fetch(contribUrl, { headers: headers(token) }),
      fetch(langUrl, { headers: headers(token) }),
    ]);

    if (!rRes.ok) {
      const text = await rRes.text().catch(() => '');
      return NextResponse.json({ error: `Repo request failed: ${rRes.status} ${text}` }, { status: rRes.status });
    }

    const [repoJson, contribJson, langJson] = await Promise.all([
      rRes.json().catch(() => null),
      cRes.ok ? cRes.json().catch(() => []) : [],
      lRes.ok ? lRes.json().catch(() => ({})) : {},
    ]);

    const body = { repo: repoJson, contributors: contribJson, languages: langJson };

    return NextResponse.json(body, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
