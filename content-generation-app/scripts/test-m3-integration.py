#!/usr/bin/env python3
import json
import sys
import os
from subprocess import run, PIPE, TimeoutExpired

def test_m3_agent():
    # Test data
    test_data = {
        "id": "test_content_001",
        "category": "templates",
        "prompt": "Create a simple business template",
        "mode": "smart",
        "context": "Test integration",
        "timestamp": "2024-01-01T00:00:00Z"
    }

    # Path to M3-Agent
    m3_path = os.path.join(os.path.dirname(__file__), '..', '..', 'm3-agent-master', 'm3-agent-master')
    control_script = os.path.join(m3_path, 'm3_agent', 'control.py')

    if not os.path.exists(control_script):
        print("❌ Control script not found")
        return False

    try:
        # Run M3-Agent with test data
        result = run([
            'python3', control_script, '--input', json.dumps(test_data)
        ], cwd=m3_path, capture_output=True, text=True, timeout=10)

        if result.returncode == 0:
            print("✅ M3-Agent test successful")
            return True
        else:
            print(f"❌ M3-Agent test failed: {result.stderr}")
            return False

    except TimeoutExpired:
        print("❌ M3-Agent test timed out")
        return False
    except Exception as e:
        print(f"❌ M3-Agent test error: {e}")
        return False

if __name__ == "__main__":
    success = test_m3_agent()
    sys.exit(0 if success else 1)
