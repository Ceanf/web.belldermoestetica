<?php
header("Content-Type: application/json");

try {
    $input = json_decode(file_get_contents("php://input"), true);
    $prompt = $input["prompt"] ?? "";

    if (empty($prompt)) {
        throw new Exception("No se recibió el texto (prompt) desde el cliente.");
    }

    $apiKey = "TU_API_KEY_AQUÍ"; // Reemplaza esto

    $data = [
        "model" => "gpt-3.5-turbo",
        "messages" => [
            ["role" => "system", "content" => "Eres un asistente útil para una clínica estética."],
            ["role" => "user", "content" => $prompt]
        ]
    ];

    $ch = curl_init("https://api.openai.com/v1/chat/completions");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json",
            "Authorization: Bearer $apiKey"
        ],
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        throw new Exception("Error en cURL: " . curl_error($ch));
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $result = json_decode($response, true);

    if ($httpCode !== 200 || !isset($result["choices"][0]["message"]["content"])) {
        throw new Exception("Respuesta inválida de OpenAI (código $httpCode): " . $response);
    }

    echo json_encode(["response" => $result["choices"][0]["message"]["content"]]);

} catch (Exception $e) {
    // Mostrar el error como respuesta para que JS lo vea
    http_response_code(500);
    echo json_encode(["response" => "⚠️ Error del servidor: " . $e->getMessage()]);
}
