import type { Product } from "../types";

const BASE = "/api";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("admin_token");
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${url}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}

export async function getProduct(id: string): Promise<Product & { id: string }> {
  return request<Product & { id: string }>(`/products/${id}`);
}

export async function createProduct(
  data: Omit<Product, "id">
): Promise<{ id: string }> {
  return request<{ id: string }>("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/products/${id}`, {
    method: "DELETE",
  });
}

export async function uploadImage(file: File): Promise<{ url: string; publicId: string }> {
  const form = new FormData();
  form.append("image", file);

  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Upload gagal");
  }
  return res.json();
}

export async function login(
  password: string
): Promise<{ token: string }> {
  return request<{ token: string }>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}
