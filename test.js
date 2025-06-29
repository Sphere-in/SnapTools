const res = fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDxTk4WAI5LAR9oTyabQuCAoFDxuXg7ni4",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: "Who is Induction motor start",
            },
          ],
        },
      ],
    }),
  }
)
  .then((res) => res.json())
  .then((data) => {
    const response = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(response);
  })

  .catch((err) => console.log(err));
