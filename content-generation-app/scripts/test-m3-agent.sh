#!/bin/bash
# Test M3-Agent Integration

echo "Testing M3-Agent integration..."

# Check if the API endpoint is accessible
echo "Testing M3-Agent API endpoint..."
curl -s -X POST http://localhost:3000/api/m3-generate \
  -H "Content-Type: application/json" \
  -d '{"category":"templates","mode":"smart","context":"test"}' | jq . || echo "API test failed - is the dev server running?"

echo ""
echo "M3-Agent integration test complete."
echo "If you see JSON response above, the integration is working!"
