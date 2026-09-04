from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.pdfgen import canvas
import fitz

def build_pdf():
    pdf_path = "public/resume-filipi-soares-en.pdf"
    
    # Page size: 612 x 792, margins: 42 left/right, 36 top/bottom
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=42,
        rightMargin=42,
        topMargin=36,
        bottomMargin=36
    )

    PRIMARY = colors.HexColor("#0F172A")
    ACCENT = colors.HexColor("#1D4ED8")
    MUTED = colors.HexColor("#64748B")
    BORDER = colors.HexColor("#CBD5E1")

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'Name',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        textColor=PRIMARY,
        spaceAfter=3
    )

    title_style = ParagraphStyle(
        'Title',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=ACCENT,
        spaceAfter=4
    )

    meta_style = ParagraphStyle(
        'Meta',
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.5,
        textColor=MUTED,
        spaceAfter=0
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=PRIMARY,
        spaceBefore=7,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.2,
        textColor=PRIMARY,
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.0,
        textColor=PRIMARY,
        leftIndent=14,
        firstLineIndent=-14,
        spaceAfter=2.5
    )

    role_style = ParagraphStyle(
        'Role',
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=11.5,
        textColor=PRIMARY
    )

    date_style = ParagraphStyle(
        'Date',
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=11.5,
        textColor=MUTED,
        alignment=2 # Right align
    )

    story = []

    # 1. Header
    story.append(Paragraph("FILIPI SOARES DA SILVA", name_style))
    story.append(Paragraph("FULL STACK DEVELOPER • PYTHON, REACT & TYPESCRIPT", title_style))
    story.append(Paragraph(
        "Florianópolis, SC — Brazil • filipi.soares.silva@gmail.com • +55 48 99933-0050 • "
        "<b>linkedin.com/in/filipiss</b> • <b>github.com/Filipiss</b>",
        meta_style
    ))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER, spaceBefore=2, spaceAfter=6))

    # 2. Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_header_style))
    story.append(Paragraph(
        "Full Stack Developer with a versatile engineering profile focused on scalable software architecture and high-standard reactive interfaces. "
        "Hands-on experience delivering end-to-end solutions using <b>Python (Flask, FastAPI, SQLAlchemy)</b> on the backend and <b>React, TypeScript, and Design Systems</b> on the frontend. "
        "Proven track record working remotely for international companies and agencies (USA and Ireland), designing and consuming RESTful APIs, containerizing services with <b>Docker</b>, "
        "and maintaining an unwavering commitment to maintainability, clean architecture, and superior user experience.",
        body_style
    ))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=6))

    # 3. Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_header_style))

    # Job 1
    t1 = Table(
        [[Paragraph("<b>Full Stack Developer</b> • Eitree (USA | Remote)", role_style),
          Paragraph("Aug 2025 — Present", date_style)]],
        colWidths=[380, 148]
    )
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t1)

    story.append(Paragraph("• <b>Full Stack Engineering:</b> End-to-end architecture and implementation of web modules utilizing Python (Flask, SQLAlchemy) on the backend and React with TypeScript on the frontend.", bullet_style))
    story.append(Paragraph("• <b>APIs & Persistence:</b> Design and consumption of structured RESTful APIs with data contract validation and efficient integration with relational databases.", bullet_style))
    story.append(Paragraph("• <b>DevOps & Environments:</b> Containerization of services, development, and testing environments via Docker, ensuring consistency between development and production.", bullet_style))
    story.append(Paragraph("• <b>Design & Interface:</b> Crafting dynamic and responsive user interfaces utilizing Styled-Components, organizing component libraries and modular folder architecture.", bullet_style))

    story.append(Spacer(1, 4))

    # Job 2
    t2 = Table(
        [[Paragraph("<b>Front-End Developer</b> • Loco (Dublin, Ireland | Remote)", role_style),
          Paragraph("Feb 2026 — Aug 2026", date_style)]],
        colWidths=[380, 148]
    )
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t2)

    story.append(Paragraph("• <b>Front-End Engineering:</b> Creation, maintenance, and customization of high-impact visual interfaces for international digital agency projects.", bullet_style))
    story.append(Paragraph("• <b>Themes & Ecosystem:</b> Advanced customization of templates, pages, and modular structures in WordPress, combining semantic HTML5, responsive CSS3, and JavaScript.", bullet_style))
    story.append(Paragraph("• <b>Performance & Compatibility:</b> Optimization of load times, cross-device responsiveness, and cross-platform compatibility focused on Core Web Vitals.", bullet_style))
    story.append(Paragraph("• <b>Integration & Plugins:</b> Strategic plugin configuration and management for secure implementation of business features and interactive user flows.", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=6))

    # 4. Featured Projects
    story.append(Paragraph("FEATURED PROJECTS & ENGINEERING", section_header_style))

    p1 = Table(
        [[Paragraph("<b>AI Assistant & Organic Chatbot</b> • <i>FastAPI, SSE Streaming, React, TypeScript</i>", role_style),
          Paragraph("Production Case", date_style)]],
        colWidths=[400, 128]
    )
    p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(p1)

    story.append(Paragraph("• Multi-provider orchestration platform (Gemini, OpenAI, Groq) with real-time streaming via Server-Sent Events (SSE), sub-190ms latency telemetry, and resilient circuit breakers.", bullet_style))
    story.append(Paragraph("• Decoupled reactive interface in React and TypeScript with Markdown syntax highlighting and efficient state management.", bullet_style))

    story.append(Spacer(1, 3))

    p2 = Table(
        [[Paragraph("<b>Time Trackerígena</b> • <i>Python, Flask, SQLAlchemy, PostgreSQL, React, TypeScript</i>", role_style),
          Paragraph("Operational Case", date_style)]],
        colWidths=[400, 128]
    )
    p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(p2)

    story.append(Paragraph("• Time allocation governance platform with ACID relational persistence, indexed aggregate queries, and reactive calendar UI with zero unnecessary re-renders.", bullet_style))
    story.append(Paragraph("• Structured backend with secure authentication, modular RESTful endpoints, and containerized deployment.", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=6))

    # 5. Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS & COMPETENCIES", section_header_style))
    story.append(Paragraph("<b>Languages & Back-End:</b> Python (Flask, FastAPI, SQLAlchemy), TypeScript, JavaScript, PostgreSQL, SQLite, RESTful APIs, Server-Sent Events (SSE), Asynchronous Programming.", body_style))
    story.append(Paragraph("<b>Front-End & Interface:</b> React, Next.js, Styled-Components, CSS3 / Sass, Semantic HTML5, Framer Motion, Design Systems, Accessibility (WCAG).", body_style))
    story.append(Paragraph("<b>DevOps & Tooling:</b> Docker, Git & GitHub, WordPress, Postman, Vite, Clean Architecture.", body_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=6))

    # 6. Education
    story.append(Paragraph("EDUCATION", section_header_style))
    e1 = Table(
        [[Paragraph("<b>B.S. in Computer Science</b> • Universidade Estácio de Sá", role_style),
          Paragraph("Completed in Dec 2025", date_style)]],
        colWidths=[380, 148]
    )
    e1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(e1)

    doc.build(story)
    print("Built public/resume-filipi-soares-en.pdf with ReportLab")

    # Render preview
    doc_fitz = fitz.open(pdf_path)
    print(f"Total pages: {len(doc_fitz)}")
    pix = doc_fitz[0].get_pixmap(dpi=150)
    pix.save("resume_en_real_preview.png")
    print("Rendered resume_en_real_preview.png")

if __name__ == "__main__":
    build_pdf()
