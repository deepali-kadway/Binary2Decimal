import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';

let dom;
let window;
let document;

beforeAll(() => {
  dom = new JSDOM(`
    <div class="container">
      <h1>Binary to Decimal Converter</h1>
      <input type="text" id="binaryInput" maxlength="8" placeholder="Enter 8-bit binary">
      <button id="convertBtn">Convert</button>
      <div id="result"></div>
    </div>
  `, { url: "http://localhost" });
  window = dom.window;
  document = window.document;
  global.window = window;
  global.document = document;
  global.HTMLElement = window.HTMLElement;
  // Import the script to attach event listeners
  require('../src/main.js');
});

describe('Binary to Decimal Converter', () => {
  beforeEach(() => {
    document.getElementById('binaryInput').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('result').style.color = '';
  });

  it('converts valid binary to decimal', () => {
    document.getElementById('binaryInput').value = '10101010';
    document.getElementById('convertBtn').click();
    expect(document.getElementById('result').textContent).toBe('Decimal: 170');
    expect(document.getElementById('result').style.color).toBe('red'); 
  });

  it('shows error for invalid input (non-binary)', () => {
    document.getElementById('binaryInput').value = '12345678';
    document.getElementById('convertBtn').click();
    expect(document.getElementById('result').textContent).toBe('Please enter a valid 8-bit binary number (only 0 or 1).');
    expect(document.getElementById('result').style.color).toBe('red');
  });

  it('shows error for input longer than 8 bits', () => {
    document.getElementById('binaryInput').value = '101010101';
    document.getElementById('convertBtn').click();
    expect(document.getElementById('result').textContent).toBe('Please enter a valid 8-bit binary number (only 0 or 1).');
    expect(document.getElementById('result').style.color).toBe('red');
  });

  it('shows error for empty input', () => {
    document.getElementById('binaryInput').value = '';
    document.getElementById('convertBtn').click();
    expect(document.getElementById('result').textContent).toBe('Please enter a valid 8-bit binary number (only 0 or 1).');
    expect(document.getElementById('result').style.color).toBe('red');
  });
});
