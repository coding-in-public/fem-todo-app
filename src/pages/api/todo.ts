export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a GET!",
    })
  );
};

export const POST: APIRoute = async ({ request }) => {
  // check for auth?
  const data = await request.json();

  try {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("yikes");
    }
    const resp = await res.json();
    if (resp) {
      return new Response(
        JSON.stringify({
          message: "success",
        }),
        {
          status: 200,
        }
      );
    } else {
      throw new Error("yikes");
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    return new Response(
      JSON.stringify({
        message: "There was an error",
      }),
      {
        status: 400,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    })
  );
};

export const DELETE: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a DELETE!",
    })
  );
};

export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
