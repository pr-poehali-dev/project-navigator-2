import json
import os
import smtplib
from email.mime.text import MIMEText
import psycopg2

def handler(event: dict, context) -> dict:
    """Приём заявки на заказ с лендинга"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (name, phone, message) VALUES (%s, %s, %s)",
        (name, phone, message)
    )
    conn.commit()
    cur.close()
    conn.close()

    contact_email = os.environ.get('CONTACT_EMAIL')
    if contact_email:
        try:
            msg = MIMEText(
                f"Новая заявка с сайта Artisana!\n\n"
                f"Имя: {name}\n"
                f"Телефон: {phone}\n"
                f"Сообщение: {message or '—'}",
                'plain', 'utf-8'
            )
            msg['Subject'] = f'Новая заявка от {name}'
            msg['From'] = 'noreply@poehali.dev'
            msg['To'] = contact_email
            with smtplib.SMTP('smtp.poehali.dev', 587) as server:
                server.sendmail('noreply@poehali.dev', [contact_email], msg.as_string())
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'success': True})
    }
