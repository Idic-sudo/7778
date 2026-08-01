export async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit,
  timeoutMs: number = 60000
): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const combinedOptions: RequestInit = {
      ...options,
      signal: options?.signal || controller.signal,
    };

    const res = await fetch(url, combinedOptions);
    clearTimeout(id);
    const text = await res.text();

    let data: any = null;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      const trimmed = text.trim().toLowerCase();
      if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')) {
        return {
          ok: false,
          status: res.status,
          error: `استجابة الخادم غير متوافقة (HTML بدل JSON). يرجى التأكد من تشغيل الخادم Backend.`
        };
      }
      if (text.includes('NOT_FOUND') || res.status === 404) {
        return {
          ok: false,
          status: 404,
          error: `مسار API المطلوب غير متوفر على الخادم الحالي (404 Not Found).`
        };
      }
      return {
        ok: false,
        status: res.status,
        error: `استجابة غير صالحة من الخادم: ${text.slice(0, 100)}`
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data?.error || `فشل الطلب مع كود الحالة ${res.status}`
      };
    }

    return {
      ok: true,
      status: res.status,
      data
    };
  } catch (err: any) {
    clearTimeout(id);
    if (err.name === 'AbortError') {
      return {
        ok: false,
        status: 0,
        error: 'انتهت مهلة الاتصال بالخادم (Timeout). يبدو أن الاستجابة بطيئة جداً.'
      };
    }
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    return {
      ok: false,
      status: 0,
      error: isOffline
        ? 'تعذر الاتصال بالشبكة (أنت غير متصل بالإنترنت حالياً).'
        : (err?.message || 'خطأ أثناء الاتصال بالخادم')
    };
  }
}
