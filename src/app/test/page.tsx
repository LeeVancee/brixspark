'use client'
import React, { useState, useEffect } from 'react'

interface Post {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  author: number
}

export default function TestPage() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://brixsparkmanual.com/wp-json/wp/v2/posts/16')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取文章失败')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-red-800 mb-4">加载错误</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <p className="text-gray-600">未找到文章内容</p>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Article Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex items-center text-sm text-gray-500">
              <span>发布时间: {formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>作者ID: {post.author}</span>
              <span className="mx-2">•</span>
              <span>文章ID: {post.id}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-6">
            <div 
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          {/* Article Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">文章摘要</h3>
            <div 
              className="text-gray-600 text-sm"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>
        </article>

        {/* API Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">API 信息</h3>
          <p className="text-blue-600 text-sm">
            数据来源: <code className="bg-blue-100 px-2 py-1 rounded">http://brixsparkmanual.com/wp-json/wp/v2/posts/16</code>
          </p>
        </div>
      </div>
    </div>
  )
}
