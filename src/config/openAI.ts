// import OpenAI from "openai";
//
// const openai = new OpenAI({
//     apiKey: "",
// });
//
// const response = openai.responses.create({
//     model: "gpt-5-nano",
//     input: "write a haiku about ai",
//     store: true,
// });
//
// response.then((result) => console.log(result.output_text));

//curl https://api.openai.com/v1/responses \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer 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" \
//   -d '{
//     "model": "gpt-5-nano",
//     "input": "write a haiku about ai",
//     "store": true
//   }'